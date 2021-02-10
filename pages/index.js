import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

const GET_CLIENTS = gql`
query getClientsBySeller {
  getClientsBySeller {
    name
    lastName
    company
    email
  }
}
`;

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_CLIENTS)



  if (loading) return "cargando...";

  if (!data.getClientsBySeller || error) {
    window.location.href = 'login';
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light"> Clients </h1>
        <Link href='/newClient'>
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">New Client </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2 ">Name</th>
              <th className="w-1/5 py-2 ">Company</th>
              <th className="w-1/5 py-2 ">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getClientsBySeller && data.getClientsBySeller.map((client) => (
              <tr key={client.id}>
                <td className="border px-4  py-2 ">{client.name} {client.lastName}</td>
                <td className="border px-4  py-2 ">{client.company}</td>
                <td className="border px-4  py-2 ">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Index;
