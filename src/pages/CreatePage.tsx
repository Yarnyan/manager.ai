
import CreateForm from "../module/createForm/CreateForm";
import Footer from "../module/footer/Footer";
export default function CreatePage() {


  return (
    <div className="flex-1 overflow-x-hidden min-h-screen ml-20 sm:ml-0">
      <div className="flex flex-col justify-between px-4 sm:px-8 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <CreateForm />
          <Footer />
        </div>
      </div>
    </div>
  );
}
