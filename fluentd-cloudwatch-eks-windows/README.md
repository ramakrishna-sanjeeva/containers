# Fluentd for Amazon EKS Windows Worker nodes with CloudWatch 

The following blog details out the exact steps for building the Fluentd container image. Docker file was referring to Ruby 2.6.x version which was causing the build to be borken. This has been addressed by updating Ruby to 2.7.5.1

https://aws.amazon.com/blogs/containers/streaming-logs-from-amazon-eks-windows-pods-to-amazon-cloudwatch-logs-using-fluentd/

