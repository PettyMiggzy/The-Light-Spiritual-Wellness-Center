"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Add your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Add an email we can reply to.");
    if (message.trim().length < 8) return setError("Write a short message.");
    setError(null);
    const body = `${message.trim()}\n\n${name.trim()}\n${email.trim()}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject.trim() || "Message from the website")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2"><Label htmlFor="name">Name</Label><Input id="name" autoComplete="name" value={name} className="h-12" onChange={(e) => setName(e.target.value)} /></div>
        <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" value={email} className="h-12" onChange={(e) => setEmail(e.target.value)} /></div>
      </div>
      <div className="grid gap-2"><Label htmlFor="subject">Subject</Label><Input id="subject" value={subject} className="h-12" onChange={(e) => setSubject(e.target.value)} /></div>
      <div className="grid gap-2"><Label htmlFor="message">Message</Label><Textarea id="message" value={message} className="min-h-32" onChange={(e) => setMessage(e.target.value)} /></div>
      {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="h-12 w-fit rounded-full px-8">Send</Button>
    </form>
  );
}
