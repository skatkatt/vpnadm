function MainCtrl($scope,$location,login) {

	$scope.login.verify();

	$scope.login = login;
	$scope.title = 'VPNADM ( reloaded )';

	$scope.instances = [ 
		{
			name 	: "ns2",
			iface 	: "tap0",
			network : "10.100.100.0",
			netmask : "32",
			ip		: "10.100.100.1",
			status  : "started",
			config  : {
				server : "ns2/server.conf",
				client : "ns2/client.conf",
			},
			crypto  : {
				key  : "ns2/ns2.key",
				crt  : "ns2/ns2.ca",
				ca	 : "ca.crt",
			}
		},
		{
			name    : "kalimaki",
            iface   : "tap1",
            network : "10.100.101.0",
            netmask : "32",
            ip      : "10.100.101.1",
            status  : "started",
            config  : {
                server : "kalimaki/server.conf",
                client : "kalimaki/client.conf",
            },
            crypto  : {
                key  : "kalimaki/ns2.key",
                crt  : "kalimaki/ns2.ca",
                ca   : "ca.crt",
            }
		}
	];

	
}
