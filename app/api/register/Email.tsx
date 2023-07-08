import { Tailwind } from "@react-email/tailwind";
import { Head } from "@react-email/head";
import { Section } from "@react-email/section";
import { Heading } from "@react-email/heading";
import { Img } from "@react-email/img";
import { Hr } from "@react-email/hr";
import { Text } from "@react-email/text";
import { Html } from "@react-email/html";

interface Props {
  opt: string;
}
export const Email = ({ opt }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#0C21C",
              },
            },
          },
        }}
      >
        <Section className="rounded-md max-w-[600px] mx-auto text-black border border-solid border-black/60 shadow-md flex justify-center p-8">
          <Img
            src="./logo.png"
            className="block rounded-full mx-auto h-16 w-16 object-cover"
            alt="SolveChat Logo"
          ></Img>
          <Heading as="h1">Confirm your email address</Heading>
          <Text className="text-xl">
            Your confirmation code is below - enter it in your open browser
            window and we&apos;ll help you get signed in.
          </Text>
          <Section className="h-48 w-full rounded-md text-center bg-[rgb(245_244_245)]">
            <Text className="text-[48px] font-semibold">{opt}</Text>
          </Section>
          <Text className="text-sm">
            If you didn&apos;t request this email, there&apos;s nothing to worry
            about - you can safely ignore it.
          </Text>
        </Section>
      </Tailwind>
    </Html>
  );
};
