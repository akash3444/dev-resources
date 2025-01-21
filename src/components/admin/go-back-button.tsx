"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={router.back}>
      <ArrowLeft /> Go Back
    </Button>
  );
};

export default GoBackButton;
