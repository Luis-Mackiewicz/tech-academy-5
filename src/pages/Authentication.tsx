import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Authentication() {
  return (
    <>
      <div className="bg-gradient-to-t from-sky-400  to-sky-700 h-screen w-screen flex justify-center items-center">
        <Card className="h-[80vh] w-[50vw] shadow-2xl border-black bg-white">
          <CardHeader>
            <CardTitle>Aqui</CardTitle>
            <CardDescription>Descricao</CardDescription>
            <CardAction>cadastro</CardAction>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
