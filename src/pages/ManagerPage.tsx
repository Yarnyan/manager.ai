import Edit from "../module/edit/Edit";

export default function ManagerPage() {

  return (
    <div className="flex-1 overflow-x-hidden min-h-screen sm:ml-0 ml-20">
      <div className="flex flex-col justify-between px-4 sm:px-8 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <Edit />
        </div>
      </div>
    </div>
  );
}
