import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

const hoje = new Date().toISOString().split('T')[0];

const eventos = [
  { title: 'ABA — João', start: `${hoje}T09:00:00`, end: `${hoje}T10:00:00`, color: '#53a587' },
  { title: 'Fono — Ana', start: `${hoje}T11:00:00`, end: `${hoje}T12:00:00`, color: '#1e40af' },
  { title: 'T.O — Pedro', start: `${hoje}T14:00:00`, end: `${hoje}T15:00:00`, color: '#ffa726' },
  { title: 'Psico — Beatriz', start: `${hoje}T16:00:00`, end: `${hoje}T17:00:00`, color: '#7c3aed' },
];

export function ClinicaAgenda() {
  return (
    <div>
      <div className="page-header"><h1>Cronograma Geral</h1></div>
      <div className="card">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={ptBrLocale}
          height={600}
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          events={eventos}
        />
      </div>
    </div>
  );
}
