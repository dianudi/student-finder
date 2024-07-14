import { config } from "dotenv";
import { Request, Response } from "express";
import { env } from "process";
config();

const url = env.MHS_URL as string;

async function index(req: Request, res: Response) {
  const query = req.query.query;
  let students;
  if (query) {
    const resApi = await fetch(`https://${url}/hit_mhs/${query}`, {
      headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5394.153 Safari/537.36" },
    });
    if (!resApi.ok) return res.redirect("/");
    const data = await resApi.json();
    students = Array.from(data.mahasiswa).map((item: any) => {
      let payload = (item.text as string).split(",");
      return { name: payload[0], university: payload[1], prodi: payload[2], id: (item["website-link"] as string).split("/")[2] };
    });
  }
  return res.render("index", { query, students });
}

async function show(req: Request, res: Response) {
  const resApi = await fetch(`https://${url}/detail_mhs/${req.params.id}`, {
    headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5394.153 Safari/537.36" },
  });
  if (!resApi.ok) return res.redirect("/");
  const data = await resApi.json();
  return res.render("show", { student: data });
}
export { index, show };
