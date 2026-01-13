import { Navigate, useLocation } from "react-router-dom";

/**
 * Usage:
 * <ProtectedRoute allow={["user"]}>...</ProtectedRoute>
 * <ProtectedRoute allow={["hospital"]}>...</ProtectedRoute>
 */
export default function ProtectedRoute({ children, allow = ["user", "hospital"] }) {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const stored = localStorage.getItem("user");

  // مش عامل login
  if (!isLoggedIn || !stored) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let user;
  try {
    user = JSON.parse(stored);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    return <Navigate to="/login" replace />;
  }

  const accountType = (user?.accountType || "").toLowerCase().trim();

  // لو accountType فاضي أو غلط
  if (!accountType || (accountType !== "user" && accountType !== "hospital")) {
    return <Navigate to="/login" replace />;
  }

  // لو نوع الحساب مش مسموح للصفحة دي
  if (!allow.includes(accountType)) {
    // ✅ نرجّعه للصفحة الصح حسب نوعه
    return <Navigate to={accountType === "hospital" ? "/emergency" : "/home"} replace />;
  }

  return children;
}