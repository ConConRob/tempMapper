aws cloudformation deploy  --profile me   --template-file ./template.yaml --stack-name mapper-frontend --capabilities CAPABILITY_IAM --region us-east-1 



# TO deploy
npm run build
aws s3 cp ./build s3://connorrob.comdev-mapper --recursive
