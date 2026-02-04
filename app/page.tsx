import { TaskList } from './_components/task-list';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <TaskList />
    </main>
  );
}