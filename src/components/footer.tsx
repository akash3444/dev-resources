import { Heart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { GithubLogo } from "./icons";

const Footer = () => {
  return (
    <footer className="flex h-14 items-center justify-between border-t px-6">
      <div className="flex items-center gap-1">
        Developed with <Heart className="h-4 w-4 fill-primary" /> by{" "}
        <a
          href="https://github.com/akash3444"
          className="font-semibold underline"
          target="_blank"
        >
          Akash Moradiya
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <a href="https://github.com/akash3444/dev-resources" target="_blank">
            <GithubLogo />
          </a>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
