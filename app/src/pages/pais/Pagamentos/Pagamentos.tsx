import { pagamentos } from '../../../data/mock';

export function PaisPagamentos() {
  return (
    <div>
      <div className="page-header"><h1>Pagamentos</h1></div>
      <div className="table-container">
        <table>
          <thead>
            <tr><th>Descrição</th><th>Valor</th><th>Vencimento</th><th>Status</th></tr>
          </thead>
          <tbody>
            {pagamentos.map(p => (
              <tr key={p.id}>
                <td>{p.descricao}</td>
                <td>{p.valor}</td>
                <td>{p.vencimento}</td>
                <td>
                  <span className={`badge ${p.status === 'Pago' ? 'badge-active' : 'badge-pending'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
