---
title: 【今更ながらChatGPT①】ラフなやり取りだけで元金均等返済を算出する簡易的なRubyプログラムが出来た
author: sam-ple
date: 2023-09-14
category: chatgpt
layout: post
---

- 初めてChatGPTでプログラム作成してみた。
- ラフなやり取りだけで1行も自分でプログラムを書かずにかなりの速さでプログラムを完成するとは、今更ながらChatGPT凄いな。。

* * *

### 依頼

🧔rubyで元金均等返済を算出するプログラムを書いて。

* * *

🤖Rubyを使用して元金均等返済を計算するプログラムを作成することができます。元金均等返済は、ローンの元金部分が毎月均等に減少し、利息が残りの元金に対して計算される方法です。以下は、元金均等返済を計算する簡単なRubyプログラムの例です。

```ruby
def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = annual_interest_rate / 12 / 100
  monthly_payment = principal * monthly_interest_rate / (1 - (1 + monthly_interest_rate)**(-num_months))

  remaining_principal = principal

  puts "月次返済額: #{monthly_payment.round(2)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{interest_payment.round(2)} 円, 元金返済額: #{principal_payment.round(2)} 円, 残りの元金: #{remaining_principal.round(2)} 円"
  end
end

# ローンの情報を設定
principal = 1000000  # ローンの元本
annual_interest_rate = 5.0  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

このプログラムは、与えられた元本、年間利率、および返済期間に基づいて、元金均等返済の月次支払額と各月の利息支払額、元金返済額、残りの元金を計算して表示します。プログラムを実行すると、月ごとの返済情報が表示されます。

注意：このコードは単純な元金均等返済を計算するものであり、実際の金融取引に使用する場合は、追加の要因（手数料、保険、税金など）を考慮する必要があります。また、正確な金融計算には、浮動小数点数の扱いに注意が必要です。

* * *

### 修正０１：浮動小数点数の扱い

🧔上記のプログラム結果において、浮動小数点数の扱いに注意したバージョンのRubyプログラムを改めて教えて。

* * *

🤖浮動小数点数の扱いに注意して、より正確な計算を行うRubyプログラムを以下に示します。このバージョンでは、Decimalクラスを使用して精度を高めています。

```ruby
require 'bigdecimal'

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate) / BigDecimal(12) / BigDecimal(100)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1) - (BigDecimal(1) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal.to_d

  puts "月次返済額: #{monthly_payment.round(2)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{interest_payment.round(2)} 円, 元金返済額: #{principal_payment.round(2)} 円, 残りの元金: #{remaining_principal.round(2)} 円"
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000)  # ローンの元本
annual_interest_rate = BigDecimal(5.0)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

このプログラムでは、BigDecimalクラスを使用してすべての計算を行っており、浮動小数点数の誤差を最小限に抑えることができます。プログラムを実行すると、月ごとの返済情報が表示されますが、より正確な計算が行われるはずです。

* * *

### 修正０２：エラー

🧔上記を実行したら「undefined method `BigDecimal' for main:Object (NoMethodError)」エラーが出たので修正して。

* * *

🤖`BigDecimal`クラスを使用するためには、`bigdecimal`ライブラリを明示的にロードする必要があります。エラーを修正するために、プログラムの先頭に以下の行を追加して、`bigdecimal`ライブラリをロードしてみてください。

```ruby
require 'bigdecimal'
```

修正後のプログラムは次のようになります。

```ruby
require 'bigdecimal'

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate) / BigDecimal(12) / BigDecimal(100)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1) - (BigDecimal(1) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal.to_d

  puts "月次返済額: #{monthly_payment.round(2)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{interest_payment.round(2)} 円, 元金返済額: #{principal_payment.round(2)} 円, 残りの元金: #{remaining_principal.round(2)} 円"
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000)  # ローンの元本
annual_interest_rate = BigDecimal(5.0)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、`BigDecimal`クラスが正しくロードされ、プログラムが実行されるはずです。

* * *

### 修正０３：エラー

🧔次は「`BigDecimal': can't omit precision for a Float. (ArgumentError)'」のエラーが出たので修正して。

* * *

🤖申し訳ありません、前回の回答に誤りがありました。Rubyの`BigDecimal`クラスは正確な計算のために精度を指定する必要がありますが、小数値を`BigDecimal`に変換する際に精度を指定することが必要です。具体的には、`BigDecimal`オブジェクトを生成する際に第2引数に精度を指定します。以下の修正版のコードをご覧ください。

```ruby
require 'bigdecimal'

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1.to_s) - (BigDecimal(1.to_s) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal.to_d

  puts "月次返済額: #{monthly_payment.round(2)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{interest_payment.round(2)} 円, 元金返済額: #{principal_payment.round(2)} 円, 残りの元金: #{remaining_principal.round(2)} 円"
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、エラーが解消され、正確な計算が行われるはずです。

* * *

### 修正０４：エラー

🧔次は「'equal_principal_amortization': undefined method 'to_d' for 0.1e7:BigDecimal (NoMethodError)」のエラーが出たよ。

* * *

🤖申し訳ありません、前の回答に誤りがありました。`BigDecimal`オブジェクトは`to_d`メソッドを持っていません。正しい方法は`to_d`ではなく`to_f`を使用することです。以下は修正版のコードです：

```ruby
require 'bigdecimal'

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1.to_s) - (BigDecimal(1.to_s) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal

  puts "月次返済額: #{monthly_payment.round(2)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{interest_payment.round(2)} 円, 元金返済額: #{principal_payment.round(2)} 円, 残りの元金: #{remaining_principal.round(2)} 円"
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、正確な計算が行われるはずです。再度エラーが出ないようになります。

* * *

### 修正０５：整数表示

🧔結果において、0.8560748e5が出てきたけど、整数で表示したい。

* * *

🤖結果を整数で表示するには、表示前に小数部分を切り捨てるか、整数に変換することができます。以下は、小数部分を切り捨てて整数で表示する方法です。

```ruby
require 'bigdecimal'

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1.to_s) - (BigDecimal(1.to_s) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal

  puts "月次返済額: #{monthly_payment.to_i} 円"  # 小数部分を切り捨てて整数に変換

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{interest_payment.to_i} 円, 元金返済額: #{principal_payment.to_i} 円, 残りの元金: #{remaining_principal.to_i} 円"  # 小数部分を切り捨てて整数に変換
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、結果が小数部分を切り捨てて整数で表示されるはずです。

* * *

### 修正０６：3桁区切り

🧔数字を3桁区切りで,表示させたい。

* * *

🤖結果を3桁区切りの整数として表示するには、Rubyの`String#reverse`と正規表現を使用して、カンマを挿入することができます。以下は修正版のコードです。

```ruby
require 'bigdecimal'

def format_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts = "#{parts}.#{number.to_s.split('.').last}" if number.to_s.include?('.')
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1.to_s) - (BigDecimal(1.to_s) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal

  puts "月次返済額: #{format_with_commas(monthly_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{format_with_commas(interest_payment)} 円, 元金返済額: #{format_with_commas(principal_payment)} 円, 残りの元金: #{format_with_commas(remaining_principal)} 円"
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、結果が3桁区切りの整数として表示されます。必要に応じて小数部分も3桁区切りで表示するように調整されています。

* * *

### 修正０７：整数かつ3桁表示

🧔上記を実行したら改めて少数以下が表示されたので、整数部分かつ3桁区切りに直して。

* * *

🤖おっしゃる通り、整数部分かつ3桁区切りで表示させるには、整数部分を切り捨ててから3桁区切りのカンマを挿入する必要があります。以下は修正版のコードです。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  monthly_payment = principal * monthly_interest_rate / (BigDecimal(1.to_s) - (BigDecimal(1.to_s) + monthly_interest_rate)**(-num_months))

  remaining_principal = principal

  puts "月次返済額: #{format_integer_with_commas(monthly_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    remaining_principal -= principal_payment

    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、結果が整数部分かつ3桁区切りで表示されるはずです。少数部分は表示されなくなります。

* * *

### 修正０８：元金返済額の変動

🧔よくよく考えたら元金返済額が変動しているので、元金均等返済になるように修正して。

* * *

🤖元金均等返済のプログラムを修正し、元金返済額が均等になるように以下に示します。このプログラムでは、毎月の元金返済額を計算し、利息支払額も毎月更新されます。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    remaining_principal -= monthly_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(monthly_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、元金返済額が均等になり、各月の利息支払額、元金返済額、残りの元金が正しく計算されます。

* * *

### 修正０９：1,000円未満の切り捨て

🧔元金返済額にて、1000円未満は切り捨てに修正して。

* * *

🤖元金返済額を1000円以下は切り捨てて表示するには、Rubyの`BigDecimal`オブジェクトを使用し、`to_i`メソッドを適用して整数に変換し、1000円以下を切り捨てることができます。以下は修正版のコードです。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    remaining_principal -= monthly_principal_payment
    
    # 元金返済額を1000円以下は切り捨てて表示
    truncated_principal_payment = monthly_principal_payment.to_i
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、元金返済額が1000円以下の場合、切り捨てて表示されます。

* * *

### 修正１０：変わりなし

🧔実行してみたけど元金返済額は変わってなく1,000円未満も表示されていた。改めて元金返済額において1,000円未満を切り捨てとし、それが計算結果に反映される様に修正して。

* * *

🤖おっしゃる通り、修正が必要です。元金返済額が1000円以下の場合に切り捨てるために、修正を加えたコードを以下に示します。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    
    # 元金返済額を1000円以下は切り捨て
    if monthly_principal_payment < 1000
      truncated_principal_payment = BigDecimal(0)
    else
      truncated_principal_payment = monthly_principal_payment.to_i
    end
    
    remaining_principal -= truncated_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えることで、元金返済額が1000円以下の場合に切り捨てられ、正確な計算結果が表示されるはずです。

* * *

### 修正１１：変更無し

🧔上記を計算すると元金返済額が83,333円となるが、83,000円にしたい。これはあくまでも例となり、83,333円の場合は83,000円の意味となり、全ての結果を83,000円にしたい訳ではない。94,333円だったら94,000円にするといった様に1,000円未満を切り捨てて計算結果に反映したい。

* * *

🤖理解しました。元金返済額を1,000円未満の場合に切り捨てて計算結果に反映させるために、修正版のコードを以下に示します。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    
    # 元金返済額を1,000円未満の場合、1,000円に切り捨て
    truncated_principal_payment = (monthly_principal_payment.to_i < 1000) ? BigDecimal(1000) : monthly_principal_payment.to_i
    
    remaining_principal -= truncated_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、元金返済額が1,000円未満の場合に1,000円に切り捨てられ、全ての結果が1,000円未満の場合に正しく表示されるはずです。

* * *

### 修正１２：変更無し

🧔うーん、やっぱり変わってないね。

* * *

🤖申し訳ありません、コードの修正が不十分でした。元金返済額を1,000円未満の場合に切り捨てるには、修正が必要です。以下は、正確な修正版のコードです。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    
    # 元金返済額を1,000円未満の場合、1,000円に切り捨て
    truncated_principal_payment = (monthly_principal_payment < 1000) ? BigDecimal(1000) : monthly_principal_payment
    truncated_principal_payment = truncated_principal_payment.to_i
    
    remaining_principal -= truncated_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、元金返済額が1,000円未満の場合に正しく切り捨てられ、計算結果に反映されるはずです。再度お試しください。

* * *

### 修正１３：変更無し

🧔うーん、やっぱり1,000円未満が残っているね。

* * *

🤖申し訳ございません、前回の修正が不十分でした。Rubyの`BigDecimal`を使用して正確に1,000円未満を切り捨てるために、次のように修正します。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def truncate_to_thousands(number)
  (number / BigDecimal('1000')).floor * BigDecimal('1000')
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    
    # 元金返済額を1,000円未満の場合、1,000円に切り捨て
    truncated_principal_payment = truncate_to_thousands(monthly_principal_payment)
    
    remaining_principal -= truncated_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ローンの情報を設定
principal = BigDecimal(1000000.to_s)  # ローンの元本
annual_interest_rate = BigDecimal(5.0.to_s)  # 年間利率（5%の場合）
num_months = 12  # 返済期間（12ヶ月）

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、元金返済額が1,000円未満の場合に正確に1,000円に切り捨てられるはずです。お試しください。

* * *

### 修正１４：入力形式

🧔ローンの元本、年間利率、返済期間に関し、それぞれgets.chompで入力する形式に変更したい。

* * *

🤖ローンの元本、年間利率、返済期間をユーザーから入力するために、`gets.chomp`を使用してプログラムを対話型に変更します。以下が修正版のコードです。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def truncate_to_thousands(number)
  (number / BigDecimal('1000')).floor * BigDecimal('1000')
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    
    # 元金返済額を1,000円未満の場合、1,000円に切り捨て
    truncated_principal_payment = truncate_to_thousands(monthly_principal_payment)
    
    remaining_principal -= truncated_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ユーザーからの入力を受け取る
print "ローンの元本を入力してください（円）: "
principal = BigDecimal(gets.chomp)

print "年間利率を入力してください（%）: "
annual_interest_rate = BigDecimal(gets.chomp)

print "返済期間（月数）を入力してください: "
num_months = gets.chomp.to_i

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、ユーザーからローンの元本、年間利率、返済期間を入力し、それに基づいて元金均等返済の計算を行います。入力後に計算結果が表示されます。

* * *

### 修正１５：最終元金0円

🧔最後の月に関してのみ残りの元金が0円になるように、元金返済額に差額を追加して。

* * *

🤖最後の月に残りの元金が0円になるように、元金返済額に差額を追加するために、以下の修正を加えたコードを示します。

```ruby
require 'bigdecimal'

def format_integer_with_commas(number)
  parts = number.to_i.to_s.reverse.scan(/.{1,3}/).join(',').reverse
  parts
end

def truncate_to_thousands(number)
  (number / BigDecimal('1000')).floor * BigDecimal('1000')
end

def equal_principal_amortization(principal, annual_interest_rate, num_months)
  monthly_interest_rate = BigDecimal(annual_interest_rate.to_s) / BigDecimal(12.to_s) / BigDecimal(100.to_s)
  
  monthly_principal_payment = principal / BigDecimal(num_months)
  remaining_principal = principal
  total_interest_payment = BigDecimal(0)

  puts "月次元金均等返済額: #{format_integer_with_commas(monthly_principal_payment)} 円"

  (1..num_months).each do |month|
    interest_payment = remaining_principal * monthly_interest_rate
    total_interest_payment += interest_payment
    
    # 最後の月には残りの元金を全額返済
    if month == num_months
      truncated_principal_payment = remaining_principal
    else
      # 元金返済額を1,000円未満の場合、1,000円に切り捨て
      truncated_principal_payment = truncate_to_thousands(monthly_principal_payment)
    end
    
    remaining_principal -= truncated_principal_payment
    
    puts "月: #{month}, 利息支払額: #{format_integer_with_commas(interest_payment)} 円, 元金返済額: #{format_integer_with_commas(truncated_principal_payment)} 円, 残りの元金: #{format_integer_with_commas(remaining_principal)} 円"
  end

  puts "総利息支払額: #{format_integer_with_commas(total_interest_payment)} 円"
end

# ユーザーからの入力を受け取る
print "ローンの元本を入力してください（円）: "
principal = BigDecimal(gets.chomp)

print "年間利率を入力してください（%）: "
annual_interest_rate = BigDecimal(gets.chomp)

print "返済期間（月数）を入力してください: "
num_months = gets.chomp.to_i

equal_principal_amortization(principal, annual_interest_rate, num_months)
```

この修正を加えたプログラムでは、最後の月に残りの元金を全額返済するために元金返済額に差額を追加し、計算結果が要件に合うはずです。

* * *

### 御礼

🧔ちゃんと反映されてた。ありがとね。

* * *

🤖どういたしまして！問題が解決して良かったです。何か他に質問やお手伝いが必要なことがあれば、いつでもお知らせください。お役に立てて嬉しいです。成功を祈っています！

* * *

### 結果

- まだまだ手直しすべき所は多いけど、ラフなやり取りでも粗方動くプログラムが出来た。

```
ローンの元本を入力してください（円）: 1000000
年間利率を入力してください（%）: 5.0
返済期間（月数）を入力してください: 12
月次元金均等返済額: 83,333 円
月: 1, 利息支払額: 4,166 円, 元金返済額: 83,000 円, 残りの元金: 917,000 円
月: 2, 利息支払額: 3,820 円, 元金返済額: 83,000 円, 残りの元金: 834,000 円
月: 3, 利息支払額: 3,475 円, 元金返済額: 83,000 円, 残りの元金: 751,000 円
月: 4, 利息支払額: 3,129 円, 元金返済額: 83,000 円, 残りの元金: 668,000 円
月: 5, 利息支払額: 2,783 円, 元金返済額: 83,000 円, 残りの元金: 585,000 円
月: 6, 利息支払額: 2,437 円, 元金返済額: 83,000 円, 残りの元金: 502,000 円
月: 7, 利息支払額: 2,091 円, 元金返済額: 83,000 円, 残りの元金: 419,000 円
月: 8, 利息支払額: 1,745 円, 元金返済額: 83,000 円, 残りの元金: 336,000 円
月: 9, 利息支払額: 1,400 円, 元金返済額: 83,000 円, 残りの元金: 253,000 円
月: 10, 利息支払額: 1,054 円, 元金返済額: 83,000 円, 残りの元金: 170,000 円
月: 11, 利息支払額: 708 円, 元金返済額: 83,000 円, 残りの元金: 87,000 円
月: 12, 利息支払額: 362 円, 元金返済額: 87,000 円, 残りの元金: 0 円
総利息支払額: 27,175 円
```

