import { ChannelsPage, channelsMetadata } from "@/components/pages/channels";

export const metadata = channelsMetadata("en");

export default function Page() {
  return <ChannelsPage lang="en" />;
}
