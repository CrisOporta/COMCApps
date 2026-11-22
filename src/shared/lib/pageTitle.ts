import { COMPANY } from '@/shared/config/company';

const ROUTE_TITLES: Array<{ match: (path: string) => boolean; title: string }> = [
  { match: p => p === '/', title: `${COMPANY.name} | ${COMPANY.tagline}` },
  { match: p => p.startsWith('/servicios'), title: `Servicios | ${COMPANY.name}` },
  { match: p => p.startsWith('/local'), title: `Sucursal Local y Servicios Físicos | ${COMPANY.name}` },
  { match: p => p.startsWith('/proyectos'), title: `Proyectos | ${COMPANY.name}` },
  { match: p => p.startsWith('/equipo'), title: `Equipo y Cultura | ${COMPANY.name}` },
  { match: p => p.startsWith('/blog'), title: `Blog Técnico | ${COMPANY.name}` },
  { match: p => p.startsWith('/contacto'), title: `Contacto | ${COMPANY.name}` },
  { match: p => p.startsWith('/privacidad'), title: `Política de Privacidad | ${COMPANY.name}` },
  { match: p => p.startsWith('/terminos'), title: `Términos de Uso | ${COMPANY.name}` },
];

export function getRouteTitle(pathname: string): string {
  const found = ROUTE_TITLES.find(entry => entry.match(pathname));
  return found ? found.title : `${COMPANY.name} | ${COMPANY.tagline}`;
}

export function setDocumentTitle(title: string): void {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
}
