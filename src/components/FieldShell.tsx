import Link from "next/link";
import FieldNav from "@/components/FieldNav";
export default function FieldShell({children}:{children:React.ReactNode}){return <div className="field-app"><header className="field-header"><Link href="/app" className="field-brand">✦ ChainGuard</Link><span className="field-demo">Data contoh</span></header><div className="field-content">{children}</div><FieldNav/></div>}
