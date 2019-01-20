/* @flow */

const actions: any = {
  selectTemplate(context: any, prop: string) {
    context.dispatch('plantumlEditor/renderUML', context.state[prop], {
      root: true
    })
  }
}

const state: any = {
  useCase: `@startuml

actor A
actor B

A -up-> (up)
A -right-> (center)
A -down-> (down)
A -left-> (left)

B -up-> (up)
B -left-> (center)
B -right-> (right)
B -down-> (down)

@enduml`,
  ActivityB: `@startuml

|A Section|
start
:step1;
|#AntiqueWhite|B Section|
:step2;
:step3;
|A Section|
:step4;
|B Section|
:step5;
stop

@enduml`,
  Activity: `@startuml

start

:step 1;

if (try) then (true)
  :step 2;
  :step 3;
else (false)
  :error;
  end
endif

stop

@enduml`,
  Sequence: `@startuml

autonumber

A -> B: step

activate B
B -> C: step

activate C
C --> C: action
C -> B: step
deactivate C

B -> A: step
deactivate B

@enduml`,
  Object: `@startuml

object Car
object Bus
object Tire
object Engine
object Driver

Car <|- Bus
Car *-down- Tire
Car *-down- Engine
Bus o-down- Driver

@enduml`,
  Class: `@startuml

class Car {
  color
  model
  +start()
  #run()
  #stop()
}

Car <|- Bus
Car *-down- Tire
Car *-down- Engine
Bus o-down- Driver

@enduml`,
  ER: `@startuml

entity Customer  {
  + id (PK)
  --
  name
  mail
}

entity Order  {
  + id (PK)
  --
  # customer id (FK)
  order date
}

entity "Order Detail" as OrderDetail {
  + id (PK)
  --
  # order id  (FK)
  price without tax
}

Customer -right-o{ Order
Order ||-right-|{ OrderDetail

@enduml`,
  State:`
  @startuml
scale 350 width
[*] --> NotShooting

state NotShooting {
  [*] --> Idle
  Idle --> Configuring : EvConfig
  Configuring --> Idle : EvConfig
}

state Configuring {
  [*] --> NewValueSelection
  NewValueSelection --> NewValuePreview : EvNewValue
  NewValuePreview --> NewValueSelection : EvNewValueRejected
  NewValuePreview --> NewValueSelection : EvNewValueSaved
  
  state NewValuePreview {
	 State1 -> State2
  }
  
}
@enduml`,
  Archimate: `
  @startuml

sprite $bProcess jar:archimate/business-process
sprite $aService jar:archimate/application-service
sprite $aComponent jar:archimate/application-component

archimate #Business "Handle claim"  as HC <<business-process>>
archimate #Business "Capture Information"  as CI <<business-process>>
archimate #Business "Notify\\nAdditional Stakeholders" as NAS <<business-process>>
archimate #Business "Validate" as V <<business-process>>
archimate #Business "Investigate" as I <<business-process>>
archimate #Business "Pay" as P <<business-process>>

HC *-down- CI
HC *-down- NAS
HC *-down- V
HC *-down- I
HC *-down- P

CI -right->> NAS
NAS -right->> V
V -right->> I
I -right->> P

archimate #APPLICATION "Scanning" as scanning <<application-service>>
archimate #APPLICATION "Customer admnistration" as customerAdministration <<application-service>>
archimate #APPLICATION "Claims admnistration" as claimsAdministration <<application-service>>
archimate #APPLICATION Printing  <<application-service>>
archimate #APPLICATION Payment  <<application-service>>

scanning -up-> CI
customerAdministration  -up-> CI
claimsAdministration -up-> NAS
claimsAdministration -up-> V
claimsAdministration -up-> I
Payment -up-> P

Printing -up-> V
Printing -up-> P

archimate #APPLICATION "Document\\nManagement\\nSystem" as DMS <<application-component>>
archimate #APPLICATION "General\\nCRM\\nSystem" as CRM <<application-component>>
archimate #APPLICATION "Home & Away\\nPolicy\\nAdministration" as HAPA <<application-component>>
archimate #APPLICATION "Home & Away\\nFinancial\\nAdministration" as HFPA <<application-component>>

DMS .up.|> scanning
DMS .up.|> Printing
CRM .up.|> customerAdministration
HAPA .up.|> claimsAdministration
HFPA .up.|> Payment

legend left
Example from the "Archisurance case study" (OpenGroup).
See 
==
<$bProcess> :business process
==
<$aService> : application service
==
<$aComponent> : application component
endlegend

@enduml`,
  Component: `
  @startuml
skinparam componentStyle uml2

interface "Data Access" as DA

DA - [First Component] 
[First Component] ..> HTTP : use

@enduml`,
  Deployment:`
  @startuml

artifact artifact1
artifact artifact2
artifact artifact3
artifact artifact4
artifact artifact5
artifact artifact6
artifact artifact7
artifact artifact8
artifact artifact9
artifact artifact10
artifact1 --> artifact2
artifact1 --* artifact3
artifact1 --o artifact4
artifact1 --+ artifact5
artifact1 --# artifact6
artifact1 -->> artifact7
artifact1 --0 artifact8
artifact1 --^ artifact9
artifact1 --(0 artifact10

@enduml`
}

export default {
  namespaced: true,
  state,
  actions
}
