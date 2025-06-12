// "use client";

import Tasks from "../components/Tasks"

export default function Home() {
  return (
    <div>
      <Tasks type="all" showAddNewButton={true} />
    </div>
  );
}
