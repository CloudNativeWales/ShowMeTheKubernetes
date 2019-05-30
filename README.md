# Show Me The Kubernetes

[![Join the chat at ](https://badges.gitter.im/cloudnativewales/mucon2019.svg)](https://gitter.im/cloudnativewales/mucon2019?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Description

More information for the workshop can be found [here](https://skillsmatter.com/conferences/11982-con-london-2019-the-conference-on-microservices-ddd-and-software-architecture?utm_source=muCon+2019+-+Attendee+List&utm_campaign=278775ea58-EMAIL_CAMPAIGN_2019_05_24_03_44&utm_medium=email&utm_term=0_8421745942-278775ea58-356019321#program).

## Introduction

### Setup

We're going to offer 2 different ways to run a cluster:

* [Minikube](minikube/README.md)
* [Docker: Kubernetes](docker/README.md)

You're more than welcome to use another service if you already know how to.

### Steps

> The code referenced can be found in the directory `src`

#### Create a Pod and a Service

* Save the following to _apple.yaml_:

```yaml
---
kind: Pod
apiVersion: v1
metadata:
  name: apple-app
  labels:
    app: apple
spec:
  containers:
    - name: apple-app
      image: denhamparry/apple:1.0.0
---
kind: Service
apiVersion: v1
metadata:
  name: apple-service
spec:
  selector:
    app: apple
  ports:
    - port: 3000
```

* Send the file to Kubernetes:

```bash
$ kubectl apply -f apple.yaml
pod "apple-app" created
service "apple-service" created
```

### Create another Pod and Service

* Save the following to _banana.yaml_:

```yaml
---
kind: Pod
apiVersion: v1
metadata:
  name: banana-app
  labels:
    app: banana
spec:
  containers:
    - name: banana-app
      image: denhamparry/banana:1.0.0
---
kind: Service
apiVersion: v1
metadata:
  name: banana-service
spec:
  selector:
    app: banana
  ports:
    - port: 3000
```

* Send the file to Kubernetes:

```bash
$ kubectl apply -f banana.yaml
pod "banana-app" created
service "banana-service" created
```

### Create an Ingress

* Save the following to _ingress.yaml_:

```yaml
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: app
  annotations:
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/rewrite-target: '/'
spec:
  rules:
  - host: demo.local
    http:
      paths:
      - path: /apple
        backend:
          serviceName: apple-service
          servicePort: 3000
      - path: /banana
        backend:
          serviceName: banana-service
          servicePort: 3000
      - path: /
        backend:
          serviceName: apple-service
          servicePort: 3000
```

* Send the file to Kubernetes:

```bash
$ kubectl apply -f ingress.yaml
ingress.extensions "app" created
```

### Test your cluster

* Using `curl`:

```bash
$ curl demo.local
<html style="background-color:#8db600 ">
  <head>
    <title>v1.0.0</title>
  </head>
  <body style="display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:sans-serif;font-size:6rem;margin:0;letter-spacing:-0.1em">
    <h1>Apple</h1>
  </body>
</html>
$ curl demo.local/apple
<html style="background-color:#8db600 ">
  <head>
    <title>v1.0.0</title>
  </head>
  <body style="display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:sans-serif;font-size:6rem;margin:0;letter-spacing:-0.1em">
    <h1>Apple</h1>
  </body>
</html>
$ curl demo.local/banana
<html style="background-color:#ffe135 ">
  <head>
    <title>v1.0.0</title>
  </head>
  <body style="display:flex;align-items:center;justify-content:center;color:#000000;font-family:sans-serif;font-size:6rem;margin:0;letter-spacing:-0.1em">
    <h1>Banana</h1>
  </body>
</html>
```

* Using your browser:

  * http://demo.local
  * http://demo.local/apple
  * http://demo.local/banana

### Delete your pods

```bash
$ kubectl delete pod apple-app banana-app
pod "apple-app" deleted
pod "banana-app" deleted
```

### Create your deployments

* Save the following to _apple-deployment.yaml_:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apple-deployment
spec:
  replicas: 5
  selector:
    matchLabels:
      app: apple
  template:
    metadata:
      labels:
        app: apple
    spec:
      containers:
      - name: apple
        image: denhamparry/apple:1.0.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3000
```

* Send the file to Kubernetes:

```bash
$ kubectl apply -f apple-deployment.yaml
deployment.apps "apple-deployment" configured

```

* Save the following to _banana-deployment.yaml_:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: banana-deployment
spec:
  replicas: 5
  selector:
    matchLabels:
      app: banana
  template:
    metadata:
      labels:
        app: banana
    spec:
      containers:
      - name: banana
        image: denhamparry/banana:1.0.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3000
```

* Send the file to Kubernetes:

```bash
$ kubectl apply -f banana-deployment.yaml
deployment.apps "banana-deployment" configured
```

### How do we scale deployments

* Change the number of replicas in your _deployment_ files:

```yaml
...
  replicas: 5
...
```

```bash
$ kubectl apply -f apple-deployment.yaml -f banana-deployment.yaml
deployment.apps "apple-deployment" configured
deployment.apps "banana-deployment" configured
```

## Exercises

When you're ready, try out these exercises [here](exercises/README.md)

## Clean up

* [Minikube](minikube/CLEANUP.md)
* [Docker](docker/CLEANUP.md)