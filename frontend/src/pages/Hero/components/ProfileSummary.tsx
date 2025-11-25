import { Title, Text, Inline } from "../../../components/typography";

export default function ProfileSummary() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/profile-picture.png"
        alt="Foto de perfil"
        className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-lg"
      />
      <div>
        <Title as="h3" className="leading-tight">
          Israel Araújo de Oliveira
        </Title>
        <Text className="mt-1">Developer FullStack Python</Text>
        <Inline as="span" className="text-[#a7b8c6] text-sm md:text-base">
          20 years old | Brazilian
        </Inline>
      </div>
    </div>
  );
}
