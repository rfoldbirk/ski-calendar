import { Form, Link, useLoaderData, useSubmit, useTransition } from "remix";
import type { LoaderFunction } from "remix";










export default function Add() {  
  return (
    <div className="mt-20">
      <Link className="bg-gray-800 hover:bg-gray-700 transition-colors m-5 p-5 rounded top-5" to="person"> Person </Link>
      <Link className="bg-gray-800 hover:bg-gray-700 transition-colors mr-5 p-5 rounded top-5" to="team"> Hold </Link>
      <Link className="bg-gray-800 hover:bg-gray-700 transition-colors p-5 rounded top-5" to="lessons"> Lektioner </Link>
    </div>
  )
}
