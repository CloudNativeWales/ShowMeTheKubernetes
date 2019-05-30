# Docker for Mac - Kubernetes

* [Back home](../README.md)

## Install Docker Kubernetes

* [Best check their official documentation here](https://docs.docker.com/docker-for-mac/#kubernetes/).

## Test Setup

```bash
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443
KubeDNS is running at https://192.168.99.100:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

* **NOTE**: If you don't see this, give us a shout!

## Create an Ingress

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
namespace "ingress-nginx" created
configmap "nginx-configuration" created
configmap "tcp-services" created
configmap "udp-services" created
serviceaccount "nginx-ingress-serviceaccount" created
clusterrole.rbac.authorization.k8s.io "nginx-ingress-clusterrole" created
role.rbac.authorization.k8s.io "nginx-ingress-role" created
rolebinding.rbac.authorization.k8s.io "nginx-ingress-role-nisa-binding" created
clusterrolebinding.rbac.authorization.k8s.io "nginx-ingress-clusterrole-nisa-binding" created
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml
service "ingress-nginx" created
$ kubectl get pods --all-namespaces -l app.kubernetes.io/name=ingress-nginx -w
NAMESPACE       NAME                                        READY     STATUS              RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-78474696b4-k9k9m   0/1       ContainerCreating   0          1m
```

## Test the Ingress

```bash
$ curl demo.local
<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx/1.15.10</center>
</body>
</html>
```

* [Back home](../README.md)

## References

* [NGINX Ingress Controller: Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)