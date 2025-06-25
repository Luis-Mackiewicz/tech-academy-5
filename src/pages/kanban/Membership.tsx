import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type Member = {
  id: number;
  nome: string;
  email: string;
  avatarSeed: string;
  role: string;
  note?: string;
};

const mockMembers: Member[] = [
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana@email.com",
    avatarSeed: "Ana Souza",
    role: "Líder",
    note: "Disponível para ajudar!",
  },
  {
    id: 2,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    avatarSeed: "Carlos Silva",
    role: "Membro",
    note: "Em férias até semana que vem.",
  },
  {
    id: 3,
    nome: "Beatriz Lima",
    email: "bia@email.com",
    avatarSeed: "Beatriz Lima",
    role: "Membro",
    note: "Foco total no projeto!",
  },
];

const groupInviteLink = "https://seuprojeto.com/invite/kanban123";

export default function Membership() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-t from-sky-400 to-sky-700 items-center justify-center">
      <Card className="w-[90vw] max-w-3xl bg-white border border-gray-300 rounded-2xl shadow-2xl p-6">
        <CardHeader className="flex flex-col items-center mb-4">
          <CardTitle className="font-black text-2xl text-sky-900">
            Membros do Projeto
          </CardTitle>
          <div className="mt-2 flex flex-col items-center">
            <span className="text-gray-600 text-sm mb-2">
              Compartilhe o link abaixo para convidar novos membros:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={groupInviteLink}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs w-64"
              />
              <Button
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs px-3 py-1"
                onClick={() => {
                  navigator.clipboard.writeText(groupInviteLink);
                }}
              >
                Copiar link
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {mockMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center bg-sky-100 border border-sky-200 rounded-xl px-4 py-3 shadow-sm ${
                  member.email === localStorage.getItem("email")
                    ? "ring-2 ring-sky-500"
                    : ""
                }`}
              >
                <img
                  src={`https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(
                    member.avatarSeed
                  )}`}
                  alt={member.nome}
                  className="w-12 h-12 rounded-full border-2 border-sky-400 shadow mr-4 bg-white"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sky-900">
                      {member.nome}
                    </span>
                    <span className="text-xs bg-sky-300 text-sky-900 rounded px-2 py-0.5 ml-2">
                      {member.role}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{member.email}</div>
                  {member.note && (
                    <div className="text-xs text-gray-700 mt-1 italic">
                      {member.note}
                    </div>
                  )}
                </div>
                {member.email === localStorage.getItem("email") && (
                  <span className="ml-2 text-xs text-sky-700 font-bold">
                    (Você)
                  </span>
                )}
                <Button
                  className="ml-4 bg-sky-600 hover:bg-sky-800 text-white text-xs px-4 py-2 rounded-lg shadow transition-all duration-200"
                  onClick={() => alert(`Visualizar perfil de ${member.nome}`)}
                  title="Visualizar perfil"
                >
                  Ver perfil
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow transition-all duration-200"
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
