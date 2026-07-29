import dns from "dns";

// Force Node.js to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Node Version:", process.version);
console.log("Node Path:", process.execPath);

console.log("DNS Servers:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.7h8glfe.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);