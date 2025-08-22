import { useSelector } from "react-redux";
// import "./premium.css";

export default function DownloadCSV() {
  const { isPremium } = useSelector((state) => state.theme);
  const items = useSelector((state) => state.cart.items);

  if (!isPremium) return null;

  const handleDownload = () => {
    const header = ["Name", "Quantity", "Price"];
    const rows = items.map((item) => [item.name, item.quantity, item.price]);
    const csvContent =
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="premium-btn" onClick={handleDownload}>
      Download(CSV)
    </button>
  );
}
