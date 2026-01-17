import { apiUsuario } from './api/apiUsuario';

export async function registrarUsuario(form, perfil, especialidad) {
  const payload = {
    ...form,
    perfil,
    especialidad,
    fechaNacimiento: form.fechaNacimiento?.toISOString?.(),
    documentosFile: form.documentosFile ? { name: form.documentosFile.name } : null,
    certificadosFile: form.certificadosFile ? { name: form.certificadosFile.name } : null,
  };

  return apiUsuario('/api/registro', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

