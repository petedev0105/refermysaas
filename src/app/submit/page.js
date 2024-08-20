"use client";
import React from "react";
import SubmissionForm from "@/components/SubmissionForm";
import Header from "@/components/Header";
import Head from "next/head";

function Submit() {
  return (
    <div className="space-y-10">
      <Header /> 
      <SubmissionForm />
    </div>
  );
}

export default Submit;
