import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type ProjectForm = {
  nome: string;
  descricao: string;
  imagem: FileList;
};

export default function EditProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const [preview, setPreview] = useState<string | null>(null);
  const [projectIndex, setProjectIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProjectForm>({
    defaultValues: {
      nome: "",
      descricao: "",
      imagem: undefined,
    },
  });

  useEffect(() => {
    const idx = location.state?.index;
    if (typeof idx === "number") {
      setProjectIndex(idx);
      const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");
      const projeto = projetos[idx];
      if (projeto) {
        reset({
          nome: projeto.nome,
          descricao: projeto.descricao,
          imagem: undefined,
        });
        setPreview(projeto.imagem || null);
      }
    }
  }, [location.state, reset]);

  const backToProjectsPage = () => {
    navigate("/projects");
  };

  const onSubmit = (data: ProjectForm) => {
    if (projectIndex === null) return;
    if (!preview) {
      setError("imagem", { message: "A imagem do projeto é obrigatória." });
      return;
    }
    const projetos = JSON.parse(localStorage.getItem("projetos") || "[]");
    projetos[projectIndex] = {
      nome: data.nome,
      descricao: data.descricao,
      imagem: preview,
    };
    localStorage.setItem("projetos", JSON.stringify(projetos));
    navigate("/projects");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("imagem");
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gradient-to-t from-sky-400 to-sky-500">
      <Card className="h-auto w-[90%] max-w-2xl border border-black p-6 rounded-xl shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-sky-900">
            Editar Projeto:{" "}
            <span className="text-sky-700">{watch("nome")}</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Altere os dados do seu projeto e salve as alterações.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome do projeto <span className="text-red-500">*</span>
              </label>
              <Input
                id="nome"
                type="text"
                placeholder="Nome"
                {...register("nome", {
                  required: "O nome do projeto é obrigatório.",
                  minLength: {
                    value: 3,
                    message: "O nome deve ter pelo menos 3 caracteres.",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ0-9\s\-_,.()]+$/,
                    message:
                      "Nome inválido. Use apenas letras, números e caracteres simples.",
                  },
                })}
              />
              {errors.nome && (
                <span className="text-xs text-red-600">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descrição
              </label>
              <Textarea
                id="descricao"
                placeholder="Descrição"
                {...register("descricao", {
                  maxLength: {
                    value: 300,
                    message: "A descrição deve ter no máximo 300 caracteres.",
                  },
                })}
              />
              {errors.descricao && (
                <span className="text-xs text-red-600">
                  {errors.descricao.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="imagem"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Imagem do projeto <span className="text-red-500">*</span>
              </label>
              <input
                id="imagem"
                type="file"
                accept="image/*"
                {...register("imagem")}
                onChange={handleImageChange}
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-700 file:text-white hover:file:bg-sky-800 transition-all duration-200"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview da imagem"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300 shadow"
                />
              )}
              {errors.imagem && (
                <span className="text-xs text-red-600">
                  {errors.imagem.message}
                </span>
              )}
            </div>

            <CardFooter className="flex flex-row w-full mt-2 p-0">
              <Button
                type="button"
                onClick={backToProjectsPage}
                className="text-white bg-gray-600 hover:bg-gray-700 w-[20%] cursor-pointer"
              >
                Voltar
              </Button>
              <Button
                type="submit"
                className="ml-auto w-[75%] bg-sky-700 hover:bg-teal-500 cursor-pointer"
              >
                Salvar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
