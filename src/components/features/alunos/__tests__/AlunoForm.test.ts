import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, jest, test, expect } from "@jest/globals";
import AlunoForm from "../AlunoForm";

describe("AlunoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve permitir digitar nos campos de texto", async () => {
    // PREPARAR
    const user = userEvent.setup();
    render(React.createElement(AlunoForm, { institutionId: "institution-id" }));

    // AGIR
    await user.type(screen.getByLabelText("Nome do aluno"), "João da Silva");
    await user.type(screen.getByLabelText("Email"), "joao.silva@example.com");

    // VERIFICAR
    expect((screen.getByLabelText("Nome do aluno") as HTMLInputElement).value).toBe("João da Silva");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("joao.silva@example.com");
  });
});