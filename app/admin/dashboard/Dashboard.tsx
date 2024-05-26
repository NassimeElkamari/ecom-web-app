"use client";
import Link from "next/link";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import useSWR from "swr";
import { formatNumber } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import Loading from "@/components/dashboardfeatures/loading/loading";
import { IoIosArrowDroprightCircle } from "react-icons/io";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/orders/summary`);

  if (error) return error.message;
  if (!summary) return <Loading />;

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Orders",
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Category",
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Users",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers
        ),
      },
    ],
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="my-2 grid gap-6 md:grid-cols-4 shadow-lg rounded-lg ">
        <div className="stat p-4 bg-[#171717] border border-white rounded-3xl">
          <div className="stat-title  text-white font-bold">Sales</div>
          <div className="stat-value text-green-600">
            ${formatNumber(summary.ordersPrice)}
          </div>
          {/* <div className="stat-desc text-gray-500 hover:underline">
            <Link href="/admin/orders">View sales</Link>
          </div> */}
        </div>
        <div className="stat p-4 bg-[#171717] border border-white rounded-3xl">
          <div className="stat-title text-white font-bold">Orders</div>
          <div className="stat-value text-blue-500">{summary.ordersCount}</div>
          <div className="stat-desc text-gray-500 hover:underline">
            <Link href="/admin/orders" passHref>
              <div className="flex items-center cursor-pointer">
                View orders
                <IoIosArrowDroprightCircle className="ml-1 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
        <div className="stat p-4 bg-[#171717] border border-white rounded-3xl">
          <div className="stat-title text-white font-bold">Products</div>
          <div className="stat-value text-orange-500">
            {summary.productsCount}
          </div>
          <div className="stat-desc text-gray-500 hover:underline">
            <Link href="/admin/products">
              <div className="flex items-center cursor-pointer">
                View products
                <IoIosArrowDroprightCircle className="ml-1 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
        <div className="stat p-4 bg-[#171717] border border-white rounded-3xl">
          <div className="stat-title text-white font-bold">Users</div>
          <div className="stat-value text-red-500">{summary.usersCount}</div>
          <div className="stat-desc text-gray-500 hover:underline">
            <Link href="/admin/users">
              <div className="flex items-center cursor-pointer">
                View Users
                <IoIosArrowDroprightCircle className="ml-1 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="border border-white rounded-3xl p-4">
          <h2 className="text-lg py-1">Sales Report</h2>
          <Line data={salesData} options={options} />
        </div>
        <div className="p-4 border border-white rounded-3xl">
          <h2 className="text-lg py-1">Orders Report</h2>
          <Line data={ordersData} options={options} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="p-4">
          <h2 className="text-lg py-1">Products Report</h2>
          <div className="flex items-center justify-center h-64 w-full">
            <Pie data={productsData} options={options} />
          </div>
        </div>
        <div className="border border-white rounded-3xl p-4">
          <h2 className="text-lg py-1">Users Report</h2>
          <Bar data={usersData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
