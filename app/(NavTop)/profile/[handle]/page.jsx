"use client";

import { Flex, Stack } from "@/components/chakra";
import { ProfileAside } from "@/components/profileAside";
import { ProfileInfo } from "@/components/profileInfo";

const Profile = ({ params }) => {
  const handle = params.handle;

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={3}>
      <ProfileAside handle={handle} />
      <Stack flex={1} height={"fit-content"}>
        <ProfileInfo handle={handle} />
      </Stack>
    </Flex>
  );
};

export default Profile;
