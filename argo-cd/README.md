
# Argo-CD deployment on Kubernetes Cluster with Windows worker nodes and Linux worker nodes

The implementation available @ https://github.com/argoproj/argo-cd/releases/tag/v2.5.3 works in a pure Linux worker nodes scenario. In case of a cluster with mix node groups (Windows and Linux), the deployment fails with the following error on Amazon EKS

    Warning FailedCreatePodSandBox 4m29s kubelet Failed to create pod sandbox: rpc error: code = Unknown desc = failed to setup network for sandbox 
    "79e11f977eb66415465099d7afd3f10e537a03e4b031a19e4c10797b1b8c069d": plugin type="vpc-shared-eni" name="vpc" failed (add): 
    failed to parse Kubernetes args: pod does not have label vpc.amazonaws.com/PrivateIPv4Address
    
The updated install.yaml provided addresses the issue by having nodeSelectors configured for the Deployments to ensure those run on Linux nodes.

    nodeSelector:
	    kubernetes.io/os: linux

