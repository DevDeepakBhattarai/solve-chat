import React, { ReactElement } from "react";

interface Props {
  params: { userId: string };
}

export default function page({ params }: Props): ReactElement {
  const { userId } = params;
  return <div>{userId}</div>;
}
