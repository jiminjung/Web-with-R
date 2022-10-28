
setwd("D:\\vscode-workspace-for-Express\\express_test\\public\\file\\3530916040")
userfilename <- "������ī_1�� ������_11�� 1��"
userfile <- paste0(userfilename,".csv")

csv_data <- read.csv(userfile, header = TRUE)

setwd("D:\\vscode-workspace-for-Express\\express_test\\public\\images\\userGraph\\")

names(csv_data)[4] <- c("����")
csv_data$co2 <- as.numeric(gsub(",","",csv_data$co2))

csv_data$�����ð� <- sub("T ","",csv_data$�����ð�)
csv_data$�����ð�<- as.POSIXct(csv_data$�����ð�, format = "%Y-%m-%d %H:%M")


#install.packages("ggplot2")
#install.packages("dplyr")
library(ggplot2)
library(dplyr)

a <- csv_data%>%
  ggplot(aes(�����ð�, �µ�, group=1))+ 
  geom_line(color = 'coral')+
  ggtitle("Temperature")+
  xlab("Time") + ylab("Temperature")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "Temperature.png", plot = a, width = 12, height = 6)


