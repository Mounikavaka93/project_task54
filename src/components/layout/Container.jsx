import { cx } from "../../utils/cx";

export default function Container({ className = "", children }) {
  return (
    <div className={cx("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 min-[1440px]:px-16", className)}>
      {children}
    </div>
  );
}
