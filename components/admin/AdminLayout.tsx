import { auth } from "@/lib/auth";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { CgShoppingBag } from "react-icons/cg";
import { MdProductionQuantityLimits } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";

const AdminLayout = async ({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return (
      <div className="relative flex flex-grow p-4">
        <div>
          <h1 className="text-2xl">Unauthorized</h1>
          <p>Admin permission required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-grow text-white">
      <div className="w-full grid md:grid-cols-5 p-2">
        <div className="bg-[#171717] rounded-xl">
          <ul className="menu text-l gap-2 cursor-pointer">
            <li>
              <Link
                className={"dashboard" === activeItem ? "bg-[#070707] text-white" : ""}
                href="/admin/dashboard"
              >
                <MdSpaceDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={"orders" === activeItem ? "bg-[#070707] text-white" : ""}
                href="/admin/orders"
              >
                <CgShoppingBag /> Orders
              </Link>
            </li>
            <li>
              <Link
                className={"products" === activeItem ? "bg-[#070707] text-white" : ""}
                href="/admin/products"
              >
                <MdProductionQuantityLimits /> Products
              </Link>
            </li>
            <li>
              <Link
                className={"users" === activeItem ? "bg-[#070707] text-white" : ""}
                href="/admin/users"
              >
                <HiUsers /> Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 px-4">{children} </div>
      </div>
    </div>
  );
};

export default AdminLayout;
