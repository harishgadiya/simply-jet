import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import usersData from "./MOCK_DATA.json";

let users: User[] = usersData;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  alternate_email: string;
  password: string;
  age: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log(req.method, '>>>>>>>>>')
    res.status(200).json(users);
  } else if (req.method === "POST") {
    console.log(req.method, '>>>>>>>>>', req.body.id);
    const newUser = {
      ...req.body,
      id: uuidv4(),
    };
    users.unshift(newUser);
    res.status(201).json(newUser);
  } else if (req.method === "PATCH") {
    const updatedUser = users.findIndex(user => user.id === req.body.id);
    if (updatedUser !== -1) {
      console.log('uuuuuuu')
      users[updatedUser] = req.body;
    }
    res.status(201).json('User is updated');
    console.log(users, '::::::::', req.body)
  } else if (req.method === "DELETE") {
    console.log(req.method, '>>>>>>>>>')
    const { id } = req.body;
    users = users.filter((user) => user.id !== id);
    console.log(users, '>>>>>>>>>>>>')
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
