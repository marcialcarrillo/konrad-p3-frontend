const serviceIdToName = (servicesArray, serviceId) =>
{
const service = servicesArray.find((serv) => Number(serv.id) === Number(serviceId));
return service?.serviceName;
}

const serviceIdToPrice = (servicesArray, serviceId) =>
{
const service = servicesArray.find((serv) => Number(serv.id) === Number(serviceId));
return service?.amountToPay;
}

export { serviceIdToName, serviceIdToPrice};