import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import ProfileButton from "../components/ui/ProfieButton";

const profileSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    cpf: z
      .string()
      .min(11, "CPF deve conter 11 dígitos")
      .regex(/^\d{11}$/, "CPF inválido"),
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ProfileData = z.infer<typeof profileSchema>;

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ProfileData) => {
    console.log("Dados atualizados:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12">
            <ProfileButton />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Editar Perfil</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value="usuario@email.com"
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" {...register("cpf")} />
            {errors.cpf && (
              <p className="text-red-500 text-sm">{errors.cpf.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Nova Senha</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4">
            Salvar Alterações
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
