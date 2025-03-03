import { useSelector } from "react-redux";
import { useCapitalize } from "../hooks/useCapitalize";
import { useFetchOrderDetails } from "../hooks/useFetchOrderDetails";
import { RootState } from "../types/State";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const UsersProduct = () => {
  const { order, updateOrderStatus, handleDeleteOrder } =
    useFetchOrderDetails();
  const { capitalizeFirstLetter } = useCapitalize();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const subtotal =
    order?.items.reduce(
      (acc, product) => acc + product.quantity * product.productId.price,
      0
    ) || 0;
  const vatAmount = subtotal * 0.15;
  const deliveryFee = order?.deliveryFee || 0;
  const totalAmount = subtotal + vatAmount + deliveryFee;

  const handleUpdateOrderStatus = () => {
    if (userInfo?.role === "admin") {
      updateOrderStatus("Shipped");
    } else if (
      userInfo?.role === "customer" &&
      order?.orderStatus === "Shipped"
    ) {
      updateOrderStatus("Delivered");
    }
  };

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`Invoice-${order?._id}.pdf`);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6">
      <div ref={invoiceRef} className="max-w-4xl w-full bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primaryColor mb-4 uppercase">
          Customer Invoice
        </h2>

        <div className="bg-gradient-to-r from-secondaryColor to-blue-50 p-6 mb-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Customer Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <strong>Name:</strong>{" "}
              {capitalizeFirstLetter(order?.userId.firstName)}{" "}
              {capitalizeFirstLetter(order?.userId.lastName)}
            </p>
            <p>
              <strong>Email:</strong> {order?.userId.email}
            </p>
            <p>
              <strong>Phone:</strong> {order?.userId.phone}
            </p>
            <p>
              <strong>ID Number:</strong> {order?.userId.idNumber}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {capitalizeFirstLetter(order?.paymentMethod)}
            </p>
            <p>
              <strong>Discount:</strong> {order?.discount}%
            </p>
            <p>
              <strong>Delivery:</strong>{" "}
              {capitalizeFirstLetter(order?.deliveryOption)}
            </p>
            <p className="col-span-2">
              <strong>Address:</strong>{" "}
              {capitalizeFirstLetter(order?.shippingAddress.street)},{" "}
              {capitalizeFirstLetter(order?.shippingAddress.town)},{" "}
              {capitalizeFirstLetter(order?.shippingAddress.city)},{" "}
              {order?.shippingAddress.postalCode}
            </p>
          </div>
        </div>

        {/* Ordered Products */}
        <div className="bg-gray-50 p-4 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Products Ordered
          </h3>
          <div className="mt-5">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="py-2 px-3 text-left text-sm font-semibold">
                    Product
                  </th>
                  <th className="py-2 px-3 text-left text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="py-2 px-3 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="py-2 px-3 text-left text-sm font-semibold">
                    Color
                  </th>
                  <th className="py-2 px-3 text-left text-sm font-semibold">
                    Size
                  </th>
                  <th className="py-2 px-3 text-left text-sm font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.items.map((product) => {
                  const price = product.productId?.price || 0;

                  return (
                    <tr key={product._id}>
                      <td className="py-2 px-3 text-sm">
                        {product.productId?.productName}
                      </td>
                      <td className="py-2 px-3 text-sm">{product.quantity}</td>
                      <td className="py-2 px-3 text-sm">R{price.toFixed(2)}</td>
                      <td className="py-2 px-3 text-sm">
                        {product.size}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {product.color}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        R{(product.quantity * price).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-50 p-4 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
          <div className="flex justify-between text-gray-600 text-sm mt-2">
            <span>Subtotal:</span> <span>R{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mt-2">
            <span>VAT (15%):</span> <span>R{vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mt-2">
            <span>Delivery Fee:</span> <span>R{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-800 text-lg font-semibold mt-2 border-t pt-2">
            <span>Total:</span> <span>R{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order?.orderStatus === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : order?.orderStatus === "Shipped"
                ? "bg-blue-200 text-blue-800"
                : order?.orderStatus === "Delivered"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {order?.orderStatus}
          </span>

          {userInfo?.role === "admin" &&
            order?.orderStatus === "Processing" && (
              <button
                onClick={() => handleUpdateOrderStatus("Shipped")}
                className="bg-primaryColor hover:bg-blue-600 text-white px-5 py-2 font-semibold transition"
              >
                Mark as Shipped
              </button>
            )}

          {userInfo?.role === "customer" &&
            order?.orderStatus === "Shipped" && (
              <button
                onClick={() => handleUpdateOrderStatus("Delivered")}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 font-semibold transition"
              >
                Mark as Delivered
              </button>
            )}

          {/* Cancel Button (Pending or Shipped) */}
          {(order?.orderStatus === "Pending" ||
            order?.orderStatus === "Shipped") && (
            <button
              onClick={() => handleUpdateOrderStatus("Cancelled")}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 font-semibold transition"
            >
              Cancel Order
            </button>
          )}

          {/* Delete Button (Delivered) */}
          {userInfo?.role === "customer" &&
            order?.orderStatus === "Delivered" && (
              <button
                onClick={handleDeleteOrder}
                className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 font-semibold transition"
              >
                Delete Order
              </button>
            )}
        </div>

        {/* Download Invoice Button (Shipped) */}
        {userInfo?.role === "customer" && order?.orderStatus === "Shipped" && (
          <div className="mt-4">
            <button
              onClick={handleDownloadInvoice}
              className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 font-semibold transition"
            >
              Download Invoice (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersProduct;
