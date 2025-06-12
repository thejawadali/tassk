// "use client";

import Tasks from "../../components/Tasks";

export default function Home() {
  return (
    <div>
      <Tasks type="completed" showAddNewButton={false} />
    </div>
  );
}
