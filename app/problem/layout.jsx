import { Box, Stack } from "@/components/chakra";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";

const ProblemLayout = (props) => {
  const { children } = props;
  return (
    <Stack minH={"lg"} height={"100vh"} gap={0} background={"gray.100"}>
      <Header full bgColor="normal" />
      {children}
    </Stack>
  );
};

export default ProblemLayout;
