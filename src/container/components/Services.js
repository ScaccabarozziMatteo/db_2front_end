import "./Services.css"

function Services({services}) {
    return (
    <table className="tablet" >
        <thead className="headc">
            <tr className="head">
            <th>
                TYPE
            </th>
            <th>
                MINUTES
            </th>
            <th>
                SMS
            </th>
            <th>
                INTERNET
            </th>
            <th>
                EXTRA MINUTES FEE
            </th>
            <th>
                EXTRA SMS FEE
            </th>
            <th>
                EXTRA INTERNET FEE
            </th>
            </tr>
        </thead>
        <tbody>
    {services.map((service) => (
      <tr
        key={service.id}
       >
            <th>
                {service.type}
            </th>
            <th>
                {service.minutes}
            </th>
            <th>
                {service.sms}
            </th>
            <th>
            {service.internet !== null ? service.internet + " GB" : null}
            </th>
            <th>
                {service.minutes_fee!== null ? service.minutes_fee + "€/minute" : null}
            </th>
            <th>
            {service.sms_fee!== null ? service.sms_fee + "€/sms" : null}
            </th>
            <th>
            {service.internet_fee!== null ? service.internet_fee + "€/GB" : null}
            </th>
        </tr>
    ))}
    </tbody>
  </table>)
  ;
};

export default Services;