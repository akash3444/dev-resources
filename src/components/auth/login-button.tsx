import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Button>
      <Link href="/login">Log in</Link>
    </Button>
  );
};

export default LoginButton;
