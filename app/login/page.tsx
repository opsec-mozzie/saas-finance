import Image from "next/image";
import React from "react";

function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2">
      {/* Esquerda */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" className="mb-8" />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <Button>Realizar login</Button>
      </div>
      {/* Direita */}
      <div className="relative h-full w-full">
        <Image
          src="/decorative.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default LoginPage;
