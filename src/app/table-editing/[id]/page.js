"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";
import TableEditor from "@/components/TableEditor";
import readUserSession from "@/lib/actions";
import { createBrowserClient } from "@supabase/ssr";

function TableEditing({ params }) {
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState(null);
  const tableId = params.id;
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function checkUser() {
    const { data } = await readUserSession();
    if (data.session) {
      // console.log(data);
      // console.log(data.session.user);
      setUser(data.session.user);
      fetchTableData(data.session.user);
    } else {
      router.push("/");
    }
  }

  async function fetchTableData(user) {
    const { data, error } = await supabase
      .from("pricing_tables")
      .select("*")
      .eq("user_id", user.id)
      .eq("table_id", tableId)
      .single();

    if (!error) {
      // console.log(data[0]);
      setTableData(data);
    }
  }

  

  useEffect(() => {
    checkUser();
  }, []);

  if (user && tableData)
    return (
      <div className="">
        <TableEditor user={user} tableId={tableId} tableData={tableData} />
      </div>
    );

  return <div className="p-10">Loading...</div>;
}

export default TableEditing;
