import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {

      const res = await API.get("/analytics");

      setData(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  if (!data) {

    return (
      <DashboardLayout>
        <div className="text-center text-xl mt-20">
          Loading Analytics...
        </div>
      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">

        📊 Analytics Dashboard

      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-xl">

          <h2 className="text-xl">

            Total Interviews

          </h2>

          <h1 className="text-5xl font-bold mt-4">

            {data.totalInterviews}

          </h1>

        </div>

        <div className="bg-green-600 text-white rounded-2xl p-8 shadow-xl">

          <h2 className="text-xl">

            Average Score

          </h2>

          <h1 className="text-5xl font-bold mt-4">

            {data.averageScore}

          </h1>

        </div>

        <div className="bg-purple-600 text-white rounded-2xl p-8 shadow-xl">

          <h2 className="text-xl">

            Best Score

          </h2>

          <h1 className="text-5xl font-bold mt-4">

            {data.bestInterview}

          </h1>

        </div>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6">

          Recent Interviews

        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Overall</th>

              <th className="text-left py-3">Technical</th>

              <th className="text-left py-3">Communication</th>

              <th className="text-left py-3">Confidence</th>

            </tr>

          </thead>

          <tbody>

            {data.recent.map((item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="py-4">

                  {item.overallScore}

                </td>

                <td>

                  {item.technicalScore}

                </td>

                <td>

                  {item.communicationScore}

                </td>

                <td>

                  {item.confidenceScore}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>

  );

}

export default Analytics;