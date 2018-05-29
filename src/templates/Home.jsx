import React from 'react';

const Home = (props) => (
  <div>
      <h3>Portfolio #1</h3>


      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>
              <a href="#">data</a>
            </td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan='3'>Table footer data</td>
          </tr>
        </tfoot>
      </table>
    </div>
);

export default Home;
