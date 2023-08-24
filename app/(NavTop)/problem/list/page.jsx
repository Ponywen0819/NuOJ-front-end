"use client";

import { Table, Thead, Tr, Link } from "@/components/chakra";
import {
  TableProvider,
  TableHeader,
  TableBody,
  TableSelector,
} from "@/components/table";
import { HOST } from "@/setting";
import NextLink from "next/link";
import useSWR from "swr";

const fetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        throw new Error("error on fetching problem list");
      }
      return res.json();
    })
    .then((json) => {
      return json.map((problem) => ({
        id: problem.header.problem_pid,
        title: {
          children: problem.header.title,
          href: `/problem/${problem.header.problem_pid}`,
        },
        author: {
          children: problem.author.handle,
          href: `/profile/${problem.author.handle}`,
        },
        lable: "",
      }));
    });

const TableLink = ({ children, href }) => {
  return (
    <Link as={NextLink} href={href} color={"orange.600"}>
      {children}
    </Link>
  );
};
const ProbleTable = () => {
  const { data: problems } = useSWR(`${HOST}/api/problem`, fetcher);

  return (
    <TableProvider
      rounded={"lg"}
      boxShadow={"sm"}
      backgroundColor={"white"}
      pageSize={10}
      isLoading={!problems}
      enableSelector={true}
    >
      <Table>
        <Thead paddingY={5}>
          <Tr backgroundColor={"rgb(254 215 170)"}>
            <TableHeader title={"題目 ID"} width={"360px"} id={"id"} />
            <TableHeader
              title={"題目名稱"}
              id={"title"}
              width={"160px"}
              textAlign={"center"}
              columnType={TableLink}
            />
            <TableHeader
              title={"題目作者"}
              id={"author"}
              textAlign={"center"}
              columnType={TableLink}
            />
            <TableHeader title={"題目標籤"} id={"lable"} textAlign={"right"} />
          </Tr>
        </Thead>
        <TableBody datas={problems} />
      </Table>
    </TableProvider>
  );
};
export default ProbleTable;